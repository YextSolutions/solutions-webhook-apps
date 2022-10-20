const TARGET_ENDPOINT = "${{slackWebhookUrl}}"; // need to create a channel //add in variable for channel URL 

export function handleListingStatusNotification (data: any) {

    const status = data.listing.status; // this is from the webhook

    if (status === "WAITING_ON_PUBLISHER") {
        var accountId = data.meta.accountId;
        var entityId = data.listing.locationId;
        var publisherId = data.listing.publisherId;
        var entityUrl = "https://www.yext.com/s/"+ accountId +"/listings/all#sortCol=DEFAULT&sortDir=asc&tab=overview";
        return notSyncPublisherMessageHandler(accountId, entityId, publisherId, entityUrl);
    } else if (status === "WAITING_ON_YEXT") {
        var accountId = data.meta.accountId;
        var entityId = data.listing.locationId;
        var publisherId = data.listing.publisherId;
        var entityUrl = "https://www.yext.com/s/"+ accountId +"/listings/all#sortCol=DEFAULT&sortDir=asc&tab=overview";
        return notSyncYextMessageHandler(accountId, entityId, publisherId, entityUrl);
    } else if (status === "UNAVAILABLE") {
        var accountId = data.meta.accountId;
        var entityId = data.listing.locationId;
        var publisherId = data.listing.publisherId;
        var entityUrl = "https://www.yext.com/s/"+ accountId +"/listings/all#sortCol=DEFAULT&sortDir=asc&tab=overview";
        return unavailableMessageHandler(accountId, entityId, publisherId, entityUrl);
    } else if (status === "LIVE") {
        var accountId = data.meta.accountId;
        var entityId = data.listing.locationId;
        var publisherId = data.listing.publisherId;
        var entityUrl = "https://www.yext.com/s/"+ accountId +"/listings/all#sortCol=DEFAULT&sortDir=asc&tab=overview";
        return liveMessageHandler(accountId, entityId, publisherId, entityUrl);
    } else if (status === "OPTED_OUT") {
        var accountId = data.meta.accountId;
        var entityUrl = "https://www.yext.com/s/"+ accountId +"/listings/all#sortCol=DEFAULT&sortDir=asc&tab=overview";
        return optOutMessageHandler(accountId, entityUrl);
    } return null;
}

export function notSyncPublisherMessageHandler(accountId: string, entityId: string, publisherId: string, entityUrl: string) {
    var message = "Your listing is not synced and is waiting on publisher action! \nAccount ID: " + accountId + ", Entity ID: " + entityId +  ", Publisher: " + publisherId + "\nSee Listings overview  here: " + entityUrl;
    return postRequest(message);
}

export function notSyncYextMessageHandler(accountId: string, entityId: string, publisherId: string, entityUrl: string) {
    var message = "Your listing is not synced and is waiting on Yext action! \nAccount ID: " + accountId + ", Entity ID: " + entityId +  ", Publisher: " + publisherId +  "\nSee Listings overview  here: " + entityUrl;
    return postRequest(message);
}

export function unavailableMessageHandler(accountId: string, entityId: string, publisherId: string, entityUrl: string) {
    var message = "Your listing is unavailable! \nAccount ID: "+ accountId + ", Entity ID: " + entityId + ", Publisher: " + publisherId + "\nSee Listings overview here: " + entityUrl;
    return postRequest(message);
}

export function liveMessageHandler(accountId: string, entityId: string, publisherId: string, entityUrl: string) {
    var message = "Your listing is now live! \nAccount ID: "+ accountId + ", Entity ID: " + entityId +  ", Publisher: " + publisherId + "\nSee Listings overview here: " + entityUrl;
    return postRequest(message);
}

export function optOutMessageHandler(accountId: string, entityUrl: string) {
    var message = "One of your listing has been opted out! \nAccount ID: "+ accountId + "\nSee Listings overview here: " + entityUrl;
    return postRequest(message);
}

export function postRequest(message: string){
    console.log("here")
    console.log(message)
    var payload = {text:message};
    //payload[field] = message;
    const request = new Request(TARGET_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });
    return fetch(request);
}