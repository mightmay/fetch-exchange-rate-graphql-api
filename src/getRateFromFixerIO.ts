
import fetch from 'cross-fetch';

const base_api_url = "https://api.apilayer.com/"

export async function fetchExchangeRate(to_currency: string, from_currency: string) {

    // set header for API call
    const headers = {
        "method": "GET",
        "redirect": "follow",
        "apikey": "V2c9NxuJkVkYCM0kcd0zEpFl8r6uTlaF",
    };

    //example: "https://api.apilayer.com/fixer/convert?to=SGD&from=USD&amount=1"
    const api_url = base_api_url+"fixer/convert?to="+to_currency+"&from="+from_currency+"&amount=1"

    //fetch API
    const response = await fetch(api_url,
        {headers})

    //throw error if response is not 200
    if (!response.ok) {
        const message = `An error has occured while calling API: ${response.status}`;
        throw new Error(message);
    }

    //get json response and return it
    const json_response = await response.json();
    return json_response;
}









