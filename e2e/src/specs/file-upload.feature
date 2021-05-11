Feature: The user can upload
    This feature lets a user upload a CAD model
@Upload
Scenario: Upload scenario
    Given I am logged in
    When I choose a model to upload
    And I upload it
    Then I can find it in the collection of uploaded models