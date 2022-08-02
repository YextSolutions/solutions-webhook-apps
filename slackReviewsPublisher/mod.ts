const TARGET_ENDPOINT = "${{slackWebhookUrl}}";

export function handleNotification(data: any) {

    const type = data.meta.eventType; // this is from the webhook
    if (type === "REVIEW_CREATED") {
        var publisherId = data.review.publisherId;
        var reviewRating = data.review.rating;
        var reviewUrl = data.review.url;
        return updateMessageHandler(publisherId, reviewRating, reviewUrl);
    }
    return null;
}

export function updateMessageHandler(publisherId: string, reviewRating: number, reviewUrl: string) {
    var message = "You received a new review! \nPublisher ID: " + publisherId + "\nReview Rating: " + reviewRating + "\nView the review here: " + reviewUrl
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
