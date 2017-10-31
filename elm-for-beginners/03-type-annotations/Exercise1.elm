-- Exercise 1
--
-- 1. Create a new file named Exercise1.elm
-- 2. Add the following list to your file
-- cart =
    -- [ { name = "Lemon", qty = 1, freeQty = 0 }
    -- , { name = "Apple", qty = 5, freeQty = 0 }
    -- , { name = "Pear", qty = 10, freeQty = 0 }
    -- ]
-- 3. Write the logic necessary to set the freeQty of each record using the following logic:
-- Purchases of 5 or more receive 1 free. Purchases of 10 or more receive 3 free.
--
--
-- Exercise 2
--
-- 1. Create a type alias for the cart records in Exercise1.elm
-- 2. Add the appropriate type annotations to all values and functions used in Exercise1.

module Main exposing (..)


import Html


type alias Item =
    { name   : String
    , qty    : Int
    , freeQty: Int
    }


cart : List Item
cart =
    [ { name = "Lemon", qty = 1,  freeQty = 0 }
    , { name = "Apple", qty = 5,  freeQty = 0 }
    , { name = "Pear",  qty = 10, freeQty = 0 }
    ]


freeSelf : Int -> Int -> Item -> Item
freeSelf minQty freeQty item =
    if item.freeQty == 0 && minQty > 0 then
        { item | freeQty = item.qty // minQty * freeQty }
    else
        item


main : Html.Html msg
main =
    List.map ((freeSelf 10 3) >> (freeSelf 5 1)) cart
        |> toString
        |> Html.text