-- Add Type Annotations to Values and Functions in Elm

import Html exposing (text, Html)

main : Html msg
main =
    let
        data : String
        data = "Hello, world!"
    in
        text data