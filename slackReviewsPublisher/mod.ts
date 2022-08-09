const TARGET_ENDPOINT = "https://hooks.slack.com/services/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";

export function handleNotification(data: any) {

    const type = data.meta.eventType; // this is from the webhook
    const recommendation = data.review.recommendation
    if (type === "REVIEW_CREATED" && typeof (recommendation) == 'undefined' ) {
        var publisherId = data.review.publisherId;
        var reviewRating = data.review.rating;
        var reviewId = data.review.id;
        var reviewUrl = "https://www.yext.com/s/3609847/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=" + reviewId;
        return updateMessageHandler(publisherId, reviewRating, reviewUrl);
    }
    else if (type === "REVIEW_CREATED" && typeof (recommendation) !== 'undefined' ) {
        var publisherId = data.review.publisherId;
        var reviewRating = data.review.recommendation;
        var reviewId = data.review.id;
        var reviewUrl = "https://www.yext.com/s/3609847/reviews#p0=status&p1=1%7C3&p2=includes&p3=&yextReviewId=" + reviewId;
        return updateMessageHandler(publisherId, reviewRating, reviewUrl);
    }
    return null;
}

export function updateMessageHandler(publisherId: string, reviewRating: number, reviewUrl: string) {
    var message = "You received a new review! \nPublisher ID: " + publisherId + "\nReview Rating: " + reviewRating + "\nSee the URL here: " + reviewUrl
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
