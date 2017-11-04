-- Exercise 3
--
-- 1. Using function composition, create a function named wordCount that returns the number of words in a sentence.
-- 2. Call the wordCount function with any sentence and display the result on the page.

module Main exposing (..)

import Html
import String

wordCount =
    String.words >> List.length

main =
    "Creation was holy but we chose against it The devil knows he's evil no need to proclaim It's the choices we make the bring glory to his name"
        |> wordCount
        |> toString
        |> Html.text