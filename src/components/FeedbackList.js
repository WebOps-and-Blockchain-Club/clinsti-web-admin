import useFetch from "../server/useFetch";

const FeedbackList = () => {
  const {data:feedback,isPending,error} = useFetch('http://localhost:3000/admin/feedback')
  return (
    <div className="feedback-list">
      {isPending && <div>Loading ... </div> }
      {error && <div>{error}</div> }
      {!isPending && !error && !feedback &&
        <div>No Feedback yet</div>
      }
      {
        feedback && 
        feedback.map((fd) =>(
          <div className="feedback">
            <span>{fd.feedback_type}</span>
            <span>{fd.feedback}</span>
          </div>
        ))
      }
    </div>
   );
}
 
export default FeedbackList