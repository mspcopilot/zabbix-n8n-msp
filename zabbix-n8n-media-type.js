/*
This script is used for integrating Zabbix with n8n for sending alerts and ticketing events. 
For comprehensive setup instructions, best practices, and updates, visit: https://mspcopilot.io/
*/

try {
    // Logging the start of the webhook script execution
    Zabbix.log(5, 'n8n Webhook: Debug: Raw input params: ' + value);

    // Parse the input parameters passed as a JSON string
    var params = JSON.parse(value),
        req = new HttpRequest(),
        resp;

    Zabbix.log(4, 'n8n Webhook: Sending request to URL: ' + params.webhook_url);

    // Optional: Configure HTTP proxy if it's specified in the parameters
    if (params.HTTPProxy) {
        Zabbix.log(4, 'n8n Webhook: Using HTTP proxy: ' + params.HTTPProxy);
        req.setProxy(params.HTTPProxy);
    }

    // 'Content-Type' is set as application/json for JSON payload
    req.addHeader('Content-Type: application/json');

    // Posting the data to the specified webhook URL
    Zabbix.log(5, 'n8n Webhook: Debug: Request payload: ' + JSON.stringify(params));
    resp = req.post(params.webhook_url, JSON.stringify(params));

    // Check the response status code. Adjust the success condition based on your webhook's success criteria
    if (req.getStatus() < 200 || req.getStatus() >= 300) {
        Zabbix.log(2, 'n8n Webhook: Error: HTTP status code ' + req.getStatus() + ' received from server');
        Zabbix.log(2, 'n8n Webhook: Error response body: ' + resp);
        throw 'n8n Webhook: Response code: ' + req.getStatus() + ', Response body: ' + resp.substring(0, 150);
    }

    Zabbix.log(4, 'n8n Webhook: Received HTTP ' + req.getStatus() + ' response from server');

    try {
        // Attempt to parse the JSON response
        if (resp === "No Customer Tag") {
            Zabbix.log(3, 'n8n Webhook: Warning: No customer tag found on problem trigger');
            throw 'No customer tag on problem trigger';
        }
        
        // Parse returned JSON
        resp = JSON.parse(resp);
        Zabbix.log(4, 'n8n Webhook: Successfully parsed webhook response');
        Zabbix.log(5, 'n8n Webhook: Debug: Full response: ' + JSON.stringify(resp));
        
        return JSON.stringify(resp);
    } catch (error) {
        // Handle parsing errors and just return blank object.
        Zabbix.log(2, 'n8n Webhook: Error parsing JSON response: ' + error);
        Zabbix.log(3, 'n8n Webhook: Raw response that failed to parse: ' + resp);
        return {"Tags": {"media_error": "Could not parse tags."}};
    }
}
catch (error) {
    // Log the error details and rethrow the error for Zabbix to catch
    Zabbix.log(2, 'n8n Webhook: Webhook sending failed: ' + error);
    throw 'Failed with error: ' + error;
}