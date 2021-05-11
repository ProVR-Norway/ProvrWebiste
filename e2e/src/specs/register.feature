Feature: The user can register an account
    This feature lets a user register for an account
@Registration
Scenario: Registration scenario
    Given my details differ from an already registered account
    When I enter the required details
    Then an account is created