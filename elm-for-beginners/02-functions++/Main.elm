module Main exposing (..)

import Html

(~+) a b =
    a + b + 0.1

result =
    1 ~+ 2

result2 =
    (~+) 1 2

main =
    Html.text (toString (result + result2))