Feature: Feature to test a demo Angular app

  @angular
  Scenario Outline: Angular test scenario
    Given user is on the Eat24 site
    When user enters his "<area>"
    #And selects Find Food
    Then the food search results are displayed
    Examples:
    |area|
    |Fremont|