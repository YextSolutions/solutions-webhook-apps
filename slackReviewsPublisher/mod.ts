const TARGET_ENDPOINT = "${{slackChannelWebhook}}";

export function handleNotification(data: any) {

    const type = data.meta.eventType;
    if (type === "REVIEW_CREATED") {
        var publisherId = data.review.publisherId;
        var reviewRating = data.review.rating;
        return updateMessageHandler(publisherId, reviewRating);
    }
    return null;
}

export function updateMessageHandler(publisherId: string, reviewRating: number) {
    var message = "You received a new review! \nPublisher ID: " + publisherId + "\nReview Rating: " + reviewRating
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