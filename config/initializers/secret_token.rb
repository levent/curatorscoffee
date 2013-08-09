# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!
# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
if Rails.env == 'production'
  CuratorscoffeeCom::Application.config.secret_token = ENV['SECRET_TOKEN']
else
  CuratorscoffeeCom::Application.config.secret_token = '6346f63d74565271e48999a3b24e5c62bebe89b8761521d8db675c804332f17449dd6f092b0a2cb0af5dbfe1220996d0af8bcaeb19d9d72aad88cdc212bd3518'
end
