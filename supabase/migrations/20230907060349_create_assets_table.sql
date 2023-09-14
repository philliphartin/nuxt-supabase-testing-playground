CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    /*  TODO: Index by user_id */
    /*  TODO: Record moderation status */
    /* Record deleted timestamp  */
);
create index idx_assets_user_id on assets (user_id);