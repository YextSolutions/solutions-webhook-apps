const TARGET_ENDPOINT = "${{slackWebhookUrl}}"

export function handleListingsQANotification(data: any) {

    const type = data.meta.eventType; // this is from the webhook
    if (type === "QUESTION_CREATED") {
        var accountId = data.meta.accountId;
        var authorName = data.question.authorName;
        var content = data.question.content;
        var questionUrl = "yext.com/s/" + accountId + "/questions";
        return createQuestionHandler(authorName, content, questionUrl);
    } else if (type === "QUESTION_UPDATED") {
        var accountId = data.meta.accountId;
        var authorName = data.question.authorName;
        var content = data.question.content;
        var questionUrl = "yext.com/s/" + accountId + "/questions";

        return updateQuestionHandler(authorName, content, questionUrl);
    }
    return null;
}

export function createQuestionHandler(authorName: string, content: string, questionUrl: string) {
    var message = "A new question has been added to one of your listings by " + authorName + "!" + "\nQuestion: " + content + "\nView your Listings Q&A here: " + questionUrl;
    return postRequest(message);
}

export function updateQuestionHandler(authorName: string, content: string, questionUrl: string) {
    var message = "A question has been updated on one of your listings!" + "\nAuthor: " + authorName + "\nQuestion: " + content + "\nView your Listings Q&A here: " + questionUrl;
    return postRequest(message);
}

export function postRequest(message: string) {
    console.log("here")
    console.log(message)
    var payload = {text: message};
    const request = new Request(TARGET_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "content-type": "application/json",
        },
    });
    return fetch(request);
}