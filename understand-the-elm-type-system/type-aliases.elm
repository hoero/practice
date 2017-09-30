-- Use Type Aliases with Records in Elm

import Html exposing (text)

type alias Person = 
    { name      : String
    , age       : Int
    , occupation: String
    }

joe : Person
joe = 
    { name       = "Joe"
    , age        = 21
    , occupation = "Analyst"
    }

bill : Person
bill = { name = "Bill", age = 21, occupation = "Developer" }

fido = { name = "Fido", breed = "Husky" }

greet : Person -> String
greet r = "Hello " ++ r.name

main =
    text (greet fido)