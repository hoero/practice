module Components.Tooltip exposing
    ( Direction(..)
    , Node(..)
    , OnEnter
    , OnTooltip
    , Text
    , Tooltip
    , TooltipArgs
    , TooltipGlobalArgs
    , TooltipHtml
    , TooltipInline
    , TooltipInlineArgs
    , TooltipType
    , Type(..)
    , onTooltip
    , onTooltipAttr
    , onTooltipCmd
    , onTooltipGlobal
    , onTooltipGlobalAttr
    , onTooltipHtml
    , onTooltipInline
    , onTooltipInlineAttr
    , tooltip
    , tooltipGlobal
    , tooltipId
    , tooltipInline
    , tooltipInlineId
    , tooltipInlineTxt
    , tooltipInlineTxtAttr
    , tooltipOnEnter
    , tooltipOnLeave
    , tooltipTxt
    , tooltipTxtDirection
    )

import Browser.Dom as Dom
import Common.Data as Data exposing (Element, Id, Position, Viewport)
import Html exposing (Attribute, Html, div, span, text)
import Html.Attributes exposing (class, classList, id, title)
import Html.Attributes.Aria exposing (ariaLabel)
import Html.Events exposing (onFocus)
import Html.Events.Extra.Mouse as Mouse
import Utils.Task exposing (getElement)
import Utils.Utils exposing (onTab, styles_)
import Utils.Viewport exposing (directs, outsideBottom, outsideLeft, outsideRight, outsideTop, position)


{-| Where it's positioned related to its trigger element,
i.e., aligned to the top/bottom.
-}
type Direction
    = Up
    | Right
    | Down
    | Left


{-|

  - Global: injected in the DOM when activated, and its position is absolute.
  - Inline: hidden next to its trigger and showed when activated.

-}
type Type
    = Global
    | Inline


{-| A tooltip (its content) could be just text or HTML.
-}
type Node
    = Text
    | Element


type alias Text =
    String


type alias TooltipInline =
    ( Direction, Text )


{-| Defines the 'onenter' event handler.
-}
type alias OnEnter msg =
    Id -> Node -> Direction -> Text -> msg


{-| Defines the tooltip data and event handlers.
-}
type alias OnTooltip msg =
    { tooltip_ : Maybe Tooltip
    , onEnter : OnEnter msg
    , onLeave : msg
    }


{-| The tooltip data

  - ID, an unique identifier to show the tooltip that's actually activated.
  - Node, the type of its content.
  - Direction, aligned to a position related to its trigger.
  - Text, the content; ignored when Node is an Element (HTML).
  - A trigger is the element that listens for events and executes the component,
  - and the triggered is the element that's showed as the result of it,
    both are viewport data.

-}
type alias Tooltip =
    { id : Id
    , node : Node
    , go : Direction
    , txt : Text
    , trigger : Maybe Element
    , triggered : Maybe Viewport
    }


{-| Arguments for inline tooltips

  - No ID, because all of them use the same one.
  - No Node, because it's always a text, it can't be HTML.

-}
type alias TooltipInlineArgs msg =
    { go : Direction
    , txt : Text
    , tooltip_ : Maybe Tooltip
    , onEnter : OnEnter msg
    , onLeave : msg
    }


{-| Arguments for global tooltips

  - It can be anything that an inline can't.

-}
type alias TooltipGlobalArgs msg =
    { node : Node
    , id_ : Id
    , go : Direction
    , txt : Text
    , tooltip_ : Maybe Tooltip
    , onEnter : OnEnter msg
    , onLeave : msg
    }


{-| Defines which tooltip to use in a component, based on the type.
-}
type alias TooltipType msg =
    { type_ : Type
    , global : Maybe (TooltipGlobalArgs msg)
    , inline : Maybe (TooltipInlineArgs msg)
    }


{-| Defines the HTML content.
It uses the children instead of using the text content coming from the tooltip data as the content.
-}
type alias TooltipHtml msg =
    { tooltip_ : Maybe Tooltip
    , classes : List ( String, Bool )
    , extraAttributes : List (Attribute msg)
    , children : List (Html msg)
    }


tooltipId : String
tooltipId =
    "tooltip"


tooltipInlineId : String
tooltipInlineId =
    tooltipId ++ "-inline"



-- Model/Cmd


{-| Initializes/creates the tooltip
-}
tooltipOnEnter :
    Id
    -> Node
    -> Direction
    -> Text
    -> { a | tooltipData : Maybe Tooltip }
    -> { a | tooltipData : Maybe Tooltip }
tooltipOnEnter id node direction txt model =
    { model
        | tooltipData =
            Just
                { id = id
                , node = node
                , go = direction
                , txt = txt
                , trigger = Nothing
                , triggered = Nothing
                }
    }


{-| Resets/destroys the tooltip
-}
tooltipOnLeave :
    { a | tooltipData : Maybe Tooltip }
    -> { a | tooltipData : Maybe Tooltip }
tooltipOnLeave model =
    { model | tooltipData = Nothing }


{-| Gets and later sets the trigger/triggered values (viewport values)
-}
onTooltipCmd : Id -> (Result Dom.Error Dom.Element -> msg) -> Cmd msg
onTooltipCmd id msg =
    -- Get it only for global tooltips
    if id /= tooltipInlineId then
        getElement id msg

    else
        Cmd.none



-- Types, defines the type


tooltipGlobal : Maybe (TooltipGlobalArgs msg) -> Maybe (TooltipType msg)
tooltipGlobal tooltip_ =
    Just <| TooltipType Global tooltip_ Nothing


tooltipInline : Maybe (TooltipInlineArgs msg) -> Maybe (TooltipType msg)
tooltipInline tooltip_ =
    Just <| TooltipType Inline Nothing tooltip_



-- Execution "element"/attributes


{-| Triggered attributes (inline tooltip) to be used as a child in any component. It's not actually the element itself but the values to be passed to the actual element (onTooltipInline).
-}
onTooltip : Maybe (TooltipType msg) -> Html msg
onTooltip tooltip_ =
    tooltip_
        |> Maybe.map
            (\t ->
                t.inline
                    |> Maybe.map (\ti -> ( ti.go, ti.txt ))
            )
        |> Maybe.withDefault Nothing
        |> onTooltipInline


{-| Assigns the tooltip related attributes to the component's trigger
-}
onTooltipAttr : Maybe (TooltipType msg) -> List (Attribute msg)
onTooltipAttr tooltip_ =
    tooltip_
        |> Maybe.map
            (\{ type_, global, inline } ->
                case type_ of
                    Global ->
                        onTooltipGlobalAttr global

                    Inline ->
                        onTooltipInlineAttr inline
            )
        |> Maybe.withDefault []



-- Inline tooltip (relative to its parent)


{-| It's used as a sibling of its trigger.
For when you want the tooltip to be a child of its container
instead of being a direct child of the body.
-}
onTooltipInline : Maybe TooltipInline -> Html msg
onTooltipInline tooltip_ =
    tooltip_
        |> Maybe.map
            (\( direction, txt ) ->
                tooltip
                    { node = Text
                    , classes = []
                    , extraAttributes = []
                    , go = direction
                    , children = [ text txt ]
                    , trigger = Nothing
                    , triggered = Nothing
                    }
            )
        |> Maybe.withDefault (text "")


onTooltipInlineAttr : Maybe (TooltipInlineArgs msg) -> List (Attribute msg)
onTooltipInlineAttr theTooltip =
    theTooltip
        |> Maybe.map
            (\{ go, txt, tooltip_, onEnter, onLeave } ->
                [ Mouse.onEnter (\_ -> onEnter tooltipInlineId Text go txt)
                , Mouse.onLeave (\_ -> onLeave)
                ]
                    -- Makes sure to clean any global tooltip in the model; without it, a global one stays opened when the next focused one is an inline tooltip.
                    ++ (tooltip_
                            |> Maybe.map
                                (\t ->
                                    t.trigger
                                        |> Maybe.map
                                            (\_ ->
                                                [ onFocus onLeave ]
                                            )
                                        |> Maybe.withDefault []
                                )
                            |> Maybe.withDefault []
                       )
                    -- Removes it when it's active, and then adds it when unactive. That way the default browser's tooltip is not shown together with it.
                    ++ (tooltip_
                            |> Maybe.map (\_ -> [])
                            |> Maybe.withDefault
                                [ title txt
                                , ariaLabel txt
                                ]
                       )
                    ++ styles_
                        [ ( "position", "relative" )
                        , ( "display", "inline-flex" )
                        , case go of
                            Up ->
                                ( "justify-content", "center" )

                            Down ->
                                ( "justify-content", "center" )

                            Left ->
                                ( "align-items", "center" )

                            Right ->
                                ( "align-items", "center" )
                        ]
            )
        |> Maybe.withDefault []



-- Global tooltip (relative to the root/body)


{-| The element (onTooltipGlobal/onTooltipHtml) that's injected in the DOM,
as a direct child of the body.
-}
onTooltipGlobal : Maybe Tooltip -> Html msg
onTooltipGlobal tooltip_ =
    tooltip_
        |> Maybe.map
            (\{ go, txt, trigger, triggered } ->
                tooltip
                    { node = Text
                    , classes = []
                    , extraAttributes = []
                    , go = go
                    , children = [ text txt ]
                    , trigger = trigger
                    , triggered = triggered
                    }
            )
        |> Maybe.withDefault (text "")


onTooltipHtml : TooltipHtml msg -> Html msg
onTooltipHtml { tooltip_, classes, extraAttributes, children } =
    tooltip_
        |> Maybe.map
            (\{ go, trigger, triggered } ->
                tooltip
                    { node = Element
                    , classes = classes
                    , extraAttributes = extraAttributes
                    , go = go
                    , children = children
                    , trigger = trigger
                    , triggered = triggered
                    }
            )
        |> Maybe.withDefault (text "")


onTooltipGlobalAttr : Maybe (TooltipGlobalArgs msg) -> List (Attribute msg)
onTooltipGlobalAttr theTooltip =
    theTooltip
        |> Maybe.map
            (\{ node, id_, go, txt, tooltip_, onEnter, onLeave } ->
                let
                    theId : String
                    theId =
                        if String.isEmpty id_ then
                            ""

                        else
                            id_ ++ "-tooltip"

                    common : List (Attribute msg)
                    common =
                        [ title txt
                        , ariaLabel txt
                        ]

                    onEnter_ : msg
                    onEnter_ =
                        onEnter theId node go txt
                in
                [ id theId
                , Mouse.onEnter (\_ -> onEnter_)
                , Mouse.onLeave (\_ -> onLeave)
                , onTab onEnter_
                ]
                    ++ (case node of
                            -- Similar action as in onTooltipInlineAttr
                            Text ->
                                tooltip_
                                    |> Maybe.map
                                        (\{ id } ->
                                            if id == theId then
                                                []

                                            else
                                                common
                                        )
                                    |> Maybe.withDefault
                                        common

                            _ ->
                                []
                       )
            )
        |> Maybe.withDefault []



-- Global/Inline tooltip on text


tooltipTxt : String -> Maybe (TooltipGlobalArgs msg) -> Html msg
tooltipTxt txt tooltip_ =
    span (class "underline" :: onTooltipGlobalAttr tooltip_)
        [ text txt ]


tooltipInlineTxt : String -> Maybe TooltipInline -> Html msg
tooltipInlineTxt txt tooltip_ =
    let
        theTooltip : TooltipInline
        theTooltip =
            tooltip_
                |> Maybe.map (\t -> t)
                |> Maybe.withDefault ( Up, "" )
    in
    span (tooltipInlineTxtAttr theTooltip)
        [ text txt
        , tooltipTxtDirection theTooltip
        ]


tooltipInlineTxtAttr : TooltipInline -> List (Attribute msg)
tooltipInlineTxtAttr ( _, txt ) =
    [ class "txt-tooltip"
    , title txt
    , ariaLabel txt
    ]


tooltipTxtDirection : TooltipInline -> Html msg
tooltipTxtDirection ( go, txt ) =
    onTooltipInline
        (case go of
            Up ->
                Just ( Up, txt )

            Down ->
                Just ( Down, txt )

            Left ->
                Just ( Left, txt )

            Right ->
                Just ( Right, txt )
        )



-- Core


type alias TooltipArgs msg =
    { node : Node
    , classes : List ( String, Bool )
    , extraAttributes : List (Attribute msg)
    , go : Direction
    , children : List (Html msg)
    , trigger : Maybe Element
    , triggered : Maybe Viewport
    }


{-| The tooltip, the triggered element
-}
tooltip : TooltipArgs msg -> Html msg
tooltip { node, classes, extraAttributes, go, children, trigger, triggered } =
    let
        viewport : Viewport
        viewport =
            trigger
                |> Maybe.map (\el -> el.viewport)
                |> Maybe.withDefault Data.viewport

        trigger_ : Viewport
        trigger_ =
            trigger
                |> Maybe.map (\el -> el.element)
                |> Maybe.withDefault Data.viewport

        triggered_ : Viewport
        triggered_ =
            triggered
                |> Maybe.map (\el -> el)
                |> Maybe.withDefault Data.element

        -- Returns if the tooltip is outside the viewport
        outsideTop_ : Float -> Bool
        outsideTop_ y_ =
            outsideTop y_ viewport.y

        outsideRight_ : Float -> Bool
        outsideRight_ x_ =
            outsideRight x_ triggered_.width viewport

        outsideBottom_ : Float -> Bool
        outsideBottom_ y_ =
            outsideBottom y_ triggered_.height viewport

        outsideLeft_ : Float -> Bool
        outsideLeft_ x_ =
            outsideLeft x_ viewport.x

        positionValues : Direction -> Maybe Position
        positionValues go_ =
            let
                x : Float
                x =
                    case go_ of
                        Left ->
                            trigger_.x - triggered_.width

                        Right ->
                            trigger_.x + trigger_.width

                        _ ->
                            let
                                x_ : Float
                                x_ =
                                    trigger_.x - (triggered_.width / 2 - trigger_.width / 2)
                            in
                            -- Redirects to the left if being centered goes outside the viewport (top/bottom left)
                            if outsideLeft_ x_ then
                                trigger_.x

                            else if outsideRight_ x_ then
                                -- Same as above but to the right (top/bottom right)
                                trigger_.x + trigger_.width - triggered_.width

                            else
                                x_

                -- Last digit in every case is for having the same alignment as the inline one
                y : Float
                y =
                    case go_ of
                        Up ->
                            trigger_.y - triggered_.height + 4

                        Down ->
                            trigger_.y + trigger_.height - 1

                        _ ->
                            let
                                y_ : Float
                                y_ =
                                    trigger_.y - (triggered_.height / 2 - trigger_.height / 2) - 1
                            in
                            -- Redirects to the top if being centered goes outside the viewport (top left/right)
                            if outsideTop_ y_ then
                                trigger_.y

                            else if outsideBottom_ y_ then
                                -- Same as above but to the bottom (bottom left/right)
                                trigger_.y + trigger_.height - triggered_.height

                            else
                                y_
            in
            -- This allow to only execute the tooltip when it's available (triggered), using it as it was before will execute it twice (without mapping triggered), when trigger is available and then when triggered is available too.
            triggered
                |> Maybe.map (\_ -> ( x, y ))

        ( directionClass, direction ) =
            let
                up : ( String, Direction )
                up =
                    ( "", Up )

                right : ( String, Direction )
                right =
                    ( "go-right", Right )

                down : ( String, Direction )
                down =
                    ( "go-down", Down )

                left : ( String, Direction )
                left =
                    ( "go-left", Left )

                ( x, y ) =
                    positionValues go
                        |> Maybe.map (\v -> v)
                        |> Maybe.withDefault ( 0, 0 )
            in
            case go of
                Up ->
                    directs up down <| outsideTop_ y

                Right ->
                    directs right left <| outsideRight_ x

                Down ->
                    directs down up <| outsideBottom_ y

                Left ->
                    directs left right <| outsideLeft_ x
    in
    div
        ([ class "Tooltip is-inverted"
         , classList <|
            [ ( directionClass, True )
            , ( "is-active"
              , trigger
                    |> Maybe.map (\_ -> True)
                    |> Maybe.withDefault False
              )
            ]
                ++ classes
         ]
            ++ (trigger
                    |> Maybe.map (\_ -> [ id tooltipId ])
                    |> Maybe.withDefault []
               )
            ++ (case node of
                    Element ->
                        styles_
                            [ ( "font-size", "inherit" )
                            , ( "font-weight", "inherit" )
                            , ( "letter-spacing", "inherit" )
                            ]

                    _ ->
                        []
               )
            ++ extraAttributes
            ++ (positionValues direction |> position)
        )
        children
