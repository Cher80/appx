/**
 * Created by auglev on 28.11.14.
 */
console.log("Loading j_remote_service");

function indxGetFeedData(feedId,page,requestId) {
    console.log("getFeedData requestId="+requestId + " feedId="+feedId + " page="+page);
    nowLoadingData();

    setTimeout(indxHaveFeedData, 300,requestId);

}


function indxGetOneArticleData(oneArticleAid) {
    console.log("indxGetOneArticleData oneArticleAid="+oneArticleAid);
    nowLoadingData();
    setTimeout(indxHaveOneArticleData, 300,12);
}





function indxDoInit(uid) {
    nowLoadingData();
    console.log("indxDoInit");


    setTimeout(indxOnInited,300);

}
