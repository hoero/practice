-- Update Elm Records with the Pipe Operator

import Html exposing (text)

type alias Person = 
    { name      : String
    , age       : Int
    , occupation: String
    , salary    : Float 
    , dog       : Dog
    }

type alias Dog =
    { name      : String
    , breed     : String
    , sterilized: Bool
    }

joe : Person
joe = 
    { name       = "Joe"
    , age        = 21
    , occupation = "Analyst"
    , salary     = 10000
    , dog        = fido
    }

fido : Dog
fido =
    { name       = "Fido"
    , breed      = "Husky"
    , sterilized = False
    }

promote : Person -> Person
promote p =
    { p | occupation = "Manager"
        , salary     = p.salary * 1.2 }

sterilizedPet : Person -> Person
sterilizedPet p =
    let
        dog = p.dog
    in
        { p | dog = { dog | sterilized = True } }

main =
    joe |> promote |> sterilizedPet |> toString |> text -- { name = "Joe", age = 21, occupation = "Manager", salary = 12000, dog = { name = "Fido", breed = "Husky", sterilized = True } }