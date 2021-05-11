Feature: Password strength check
    This feature validates if a password is strong enough
@PasswordTest
Scenario: Password strength scenario
    Given I am on the registration page
    And I have entered a valid email and username
    When I enter a password that is at least 8 characters long, has at least one capital and lowercase letter, and a special character
    Then I will be able to create an account