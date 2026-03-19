import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from 'next-sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Obtener productos de Sanity para verificar precios
    const productIds = items.map((item: { _id: string }) => item._id);
    const products = await sanityClient.fetch(
      `*[_type == "product" && _id in $ids] {
        _id,
        name,
        price,
        stripeProductId
      }`,
      { ids: productIds }
    );

    // Crear line items para Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { _id: string; quantity: number }) => {
        const product = products.find((p: { _id: string }) => p._id === item._id);
        
        if (!product) {
          throw new Error(`Product not found: ${item._id}`);
        }

        return {
          price_data: {
            currency: 'ars',
            product_data: {
              name: product.name,
              metadata: {
                sanity_id: product._id,
              },
            },
            unit_amount: Math.round(product.price * 100), // Stripe usa centavos
          },
          quantity: item.quantity,
        };
      }
    );

    // Crear sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        // Puedes agregar metadata adicional aquí
      },
      shipping_address_collection: {
        allowed_countries: ['AR'],
      },
      billing_address_collection: 'required',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
