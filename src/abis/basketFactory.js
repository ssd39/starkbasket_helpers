export default [
    {
      "type": "impl",
      "name": "BasketRegistry",
      "interface_name": "stark_basket::basket_factory::IBasketRegistry"
    },
    {
      "type": "struct",
      "name": "core::byte_array::ByteArray",
      "members": [
        {
          "name": "data",
          "type": "core::array::Array::<core::bytes_31::bytes31>"
        },
        {
          "name": "pending_word",
          "type": "core::felt252"
        },
        {
          "name": "pending_word_len",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::integer::u256",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "type": "interface",
      "name": "stark_basket::basket_factory::IBasketRegistry",
      "items": [
        {
          "type": "function",
          "name": "create_basket",
          "inputs": [
            {
              "name": "name",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "symbol",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "tokens",
              "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
            },
            {
              "name": "weights",
              "type": "core::array::Array::<core::integer::u256>"
            },
            {
              "name": "whitelisted",
              "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
            },
            {
              "name": "salt",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "basket_token_class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "type": "event",
      "name": "stark_basket::basket_factory::BasketRegistry::Event",
      "kind": "enum",
      "variants": []
    }
  ]