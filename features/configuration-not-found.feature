Feature: Configuration not found
  In order to be notified that configuration wasn't loaded properly
  As an Isotope Mail Client user
  I want to be shown an informative error page

  Scenario: Fixed route exists for configuration not found error page
    Given a fixed error route URL https://isotope.marcnuri.com/configuration-not-found
    When I access this URL
    Then  I'm shown an error page stating configuration wasn't found

