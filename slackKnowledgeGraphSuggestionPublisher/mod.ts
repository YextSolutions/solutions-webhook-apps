const TARGET_ENDPOINT = "${{slackWebhookUrl}}";

export function handleKnowledgeGraphSuggestionNotification (data: any) {

    const type = data.meta.eventType; // this is from the webhook

    if (type === "SUGGESTION_CREATED") {
        var accountId = data.meta.accountId;
        var entityId = data.suggestion.entityFieldSuggestion.entity.id;
        var entityUrl = "https://www.yext.com/s/${{businessId}}/entities"; //"https://www.yext.com/s/${{businessId}}/entity/edit3?entityIds=" + data.suggestion.entityFieldSuggestion.entity.uid;
        return createMessageHandler(accountId, entityId, entityUrl);
    } else if (type === "SUGGESTION_REJECTED") {
        var accountId = data.meta.accountId;
        var entityId = data.suggestion.entityFieldSuggestion.entity.id;
        var entityUrl = "https://www.yext.com/s/${{businessId}}/entities"; //"https://www.yext.com/s/${{businessId}}/entity/edit3?entityIds=" + data.suggestion.entityFieldSuggestion.entity.uid;
        return rejectMessageHandler(accountId, entityId, entityUrl);
    } 
    return null;
}

export function createMessageHandler(accountId: string, entityId: string, entityUrl: string) {
    var message = "A new suggestion is available! \nAccount ID: " + accountId + ", Entity ID: " + entityId +  "\nSee the URL here: " + entityUrl;
    return postRequest(message);
}

export function rejectMessageHandler(accountId: string, entityId: string, entityUrl: string) {
    var message = "A suggestion has been rejected! \nAccount ID: "+ accountId + ", Entity ID: " + entityId + "\nSee the URL here: " + entityUrl;
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