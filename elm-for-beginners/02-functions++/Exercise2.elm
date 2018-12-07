-- Exercise 2
--
-- 1. Call your new function ~= as a prefix function.
-- 2. Display the result on the page

module Main exposing (..)

import Html
import String

(~=) str1 str2 =
    if String.left 1 str1 == String.left 1 str2 then
        True
    else
        False

main =
    (~=) "Hoeru" "Oriba"
        |> toString
        |> Html.text