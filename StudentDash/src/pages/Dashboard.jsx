import SavedCareers from "../components/SavedCareers";
import QuizHistory from "../components/QuizHistory";
import ProgressTracker from "../components/SuggestedSkills";

export default function Dashboard({ user }) {
    return (
        <div>
            <h1>Welcome,{user.displayName}</h1>

            <SavedCareers uid={user.uid} />
            <QuizHistory uid={user.uid} />
            <ProgressTracker uid={user.uid} />
            <SuggestedSkills uid={user.uid} />
        </div>
    );
}