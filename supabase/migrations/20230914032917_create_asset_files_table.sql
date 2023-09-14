CREATE TABLE asset_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users NOT NULL,
    asset_id UUID REFERENCES assets NOT NULL,
    type TEXT NOT NULL,
    name TEXT,
    size BIGINT NOT NULL,
    mime TEXT NOT NULL,
    extension TEXT,
    path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    /*  TODO: Index by asset_id */
);
create index idx_asset_files_asset_id on asset_files (asset_id);
create index idx_asset_files_user_id on asset_files (user_id);