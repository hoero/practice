-- Exercise 2
--
-- 1. Create a new file named Exercise2.elm
-- 2. Import the Html Module
-- 3. Create a function that uppercases names longer than 10 characters
-- 4. Display the name in appropriate uppercased form with the length of the name right next to it
--    like the following: "JAMES MOORE - name length: 11" or "foo bar - name length: 7"

module Main exposing (..)

import Html
import String

uppercase maxLength name =
    if String.length name > maxLength then

        String.concat [String.toUpper name, " - name length: ", ( toString (String.length name) )]

    else

        String.concat [name, " - name length: ", ( toString (String.length name) )]

main =
    Html.text (uppercase 10 "Hoeru")