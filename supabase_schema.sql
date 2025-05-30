-- Enable UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- plans table
CREATE TABLE public.plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'TRY' NOT NULL,
    features JSONB,
    limits JSONB,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add indexes to plans table
CREATE INDEX idx_plans_plan_id ON public.plans(plan_id);
CREATE INDEX idx_plans_active ON public.plans(active);

-- subscriptions table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.plans(plan_id) ON DELETE RESTRICT,
    status TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    trial_start_date TIMESTAMPTZ,
    trial_end_date TIMESTAMPTZ,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add indexes to subscriptions table
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan_id ON public.subscriptions(plan_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON public.subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for plans table
CREATE TRIGGER set_timestamp_plans
BEFORE UPDATE ON public.plans
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Trigger for subscriptions table
CREATE TRIGGER set_timestamp_subscriptions
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

COMMENT ON COLUMN public.plans.plan_id IS 'Unique identifier for the plan (e.g., ''starter'', ''professional'', ''kurumsal'')';
COMMENT ON COLUMN public.plans.price IS 'Monthly price of the plan';
COMMENT ON COLUMN public.plans.currency IS 'Currency code (e.g., ''TRY'', ''USD'')';
COMMENT ON COLUMN public.plans.features IS 'Array of text strings describing plan features';
COMMENT ON COLUMN public.plans.limits IS 'Object defining plan limits (e.g., {"restaurants": 1, "staff_per_restaurant": 5, "advanced_reports": false})';
COMMENT ON COLUMN public.plans.active IS 'Whether the plan is currently available for new subscriptions';

COMMENT ON COLUMN public.subscriptions.user_id IS 'Foreign key referencing auth.users(id)';
COMMENT ON COLUMN public.subscriptions.plan_id IS 'Foreign key referencing plans(plan_id)';
COMMENT ON COLUMN public.subscriptions.status IS 'Subscription status (e.g., ''active'', ''inactive'', ''cancelled'', ''trialing'', ''past_due'')';
COMMENT ON COLUMN public.subscriptions.stripe_subscription_id IS 'Unique ID from Stripe for this subscription (if using Stripe)';
COMMENT ON COLUMN public.subscriptions.stripe_customer_id IS 'Unique ID from Stripe for the customer (if using Stripe)';
COMMENT ON COLUMN public.subscriptions.cancelled_at IS 'When the subscription was effectively cancelled';
