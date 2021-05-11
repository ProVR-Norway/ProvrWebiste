Feature: The user can log in
    This feature lets a user login to their account by inputting the correct credentials
@Login
Scenario: Login scenario
    Given I am registered with an account
    When I enter my credentials
    Then I have access to my account