module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


---- MODEL ----


type alias Model =
    { players  : List Player
    , name     : String
    , playerId : Maybe Int
    , plays    : List Play
    }


type alias Player =
    { id     : Int
    , name   : String
    , points : Int
    }


type alias Play =
    { id       : Int
    , playerId : Int
    , name     : String
    , points   : Int
    }


init : ( Model, Cmd Msg )
init =
    ({ players  = []
    , name     = ""
    , playerId = Nothing
    , plays    = []
    }, Cmd.none )



---- UPDATE ----


type Msg
    = Edit Player
    | Score Player Int
    | Input String
    | Save
    | Cancel
    | DeletePlay Play


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    (case msg of
        Input name ->
            Debug.log "Input Updated Model"
                { model | name = name }

        _ ->
            model
    , Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [ class "scoreboard" ]
        [ h1 [] [ text "Score Keeper" ]
        , playerForm model
        , p [] [ text (toString model) ]
        ]



playerForm : Model -> Html Msg
playerForm model =
    Html.form [ onSubmit Save ]
        [ input
            [ type_ "text"
            , placeholder "Add/Edit Player..."
            , onInput Input
            , value model.name
            ]
            []
        , button [ type_ "submit" ] [ text "Save" ]
        , button [ type_ "button", onClick Cancel ] [ text "Cancel" ]
        ]


---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view          = view
        , init          = init
        , update        = update
        , subscriptions = always Sub.none
        }
