const TARGET_ENDPOINT = "${{slackWebhookUrl}}";

export function handleNotification(data: any) {

    const type = data.meta.eventType;
    if (type === "REVIEW_CREATED") {
        var publisherId = data.review.publisherId;
        if (data.review.recommendation == "") {
            var reviewRating = data.review.rating
            var ratingString = reviewRating.toString()
        }
        else {
            var ratingString = data.review.recommendation
        }
        return updateMessageHandler(publisherId, ratingString);
    }
    return null;
}

export function updateMessageHandler(publisherId: string, ratingString: string) {
    var message = "You received a new review! \nPublisher ID: " + publisherId + "\nReview Rating: " + ratingString
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
