const TARGET_ENDPOINT = "${{slackWebhookUrl}}"; 

export function handleListingDuplicateNotification (data: any) {

    const type = data.meta.eventType; // this is from the webhook
    const status = data.duplicate.status; // this is from the webhook
    
    if (status === "POSSIBLE_DUPLICATE") {
        var accountId = data.meta.accountId;
        var publisherId = data.duplicate.publisherId;
        var entityId = data.duplicate.locationId;
        var duplicateUrl = data.duplicate.url;
        var suppressionType = data.duplicate.supressionType;
        return foundMessageHandler(publisherId, accountId, entityId, duplicateUrl, suppressionType);
    } else if (status === "UNAVAILABLE") {
        var accountId = data.meta.accountId;
        var entityId = data.duplicate.locationId;
        var publisherId = data.duplicate.publisherId;
        var duplicateUrl = data.duplicate.url;
        return failedupdatedMessageHandler(publisherId, accountId, entityId, duplicateUrl);
    } else if (status === "DELETED") {
        var accountId = data.meta.accountId;
        var entityId = data.duplicate.locationId;
        var publisherId = data.duplicate.publisherId;
        return deleteMessageHandler(publisherId, entityId, accountId)
    }
    return null;
}

export function foundMessageHandler(publisherId: string, suppressionType: string, accountId: string, entityId: string, duplicateUrl: string) {
    var message = "Duplicate found on " + publisherId + " and " + suppressionType + " action has been taken! \nAccount ID: " + accountId + ", Entity ID: " + entityId +  "\nSee the duplicate URL here: " + duplicateUrl;
    return postRequest(message);
}

export function failedupdatedMessageHandler(publisherId: string, accountId: string, entityId: string, duplicateUrl: string) {
    var message = "Duplicate found on " + publisherId +" and has not been able to be suppressed! \nAccount ID: "+ accountId + ", Entity ID: " + entityId + "\nSee the duplicate URL here: " + duplicateUrl;
    return postRequest(message);
}

export function deleteMessageHandler(publisherId: string, entityId: string, accountId: string) {
    var message = "Duplicate has been deleted on " + publisherId + "! \nAccount ID: " + accountId + ", Entity ID: " + entityId;
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