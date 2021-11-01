import styles from '../styles/Home.module.css';

export default function CourseCard({course}) {
    
    //for now we will set everything to this but we can simply change these values to the values of the prop course object when we get those
    const courseName = "SoftwareDev"
    const courseDifficulty = 60;
    const courseInteresting = 60;
    const courseTimeCommitment = 10;

    const difficultyBarStyle = {
        width: `${courseDifficulty}%`,
        background: "#47b5ff"
    }
    const interestingBarStyle = {
        width:`${courseInteresting}%`,
        background: "#47b5ff"
    }
    const timeCommitmentBarStyle = {
        width:`${courseTimeCommitment}%`,
        background: "#47b5ff"
    }

    return(
    <div class={styles.classBox}>
        <div class={styles.className}>
            <span>{courseName}</span>
        </div>


        <div class={styles.courseBody}>
            <div class={styles.difficulty}>
                <div class="difficultyName">
                    <p>Difficulty</p>
                </div>
                <div class={styles.difficultyBarBackground}>
                    <span class={styles.difficultyBar} style={difficultyBarStyle}>
                    </span>
                </div>
            </div>

            <div class="interesting">
                <div class="interesting-name">
                    <p>Interesting</p>
                </div>
                <div class={styles.interestingBarBackground}>
                    <span class={styles.interestingBar} style={interestingBarStyle}>
                    </span>
                </div>
            </div>

            <div class="timecommitment">
                <div class="timecommitment-name">
                    <p>Time Commitment</p>
                </div>
                <div class="timecommitment-bar-wrapper">
                    <div class={styles.timecommitmentBarBackground}>
                        <span class={styles.timecommitmentBar} style={timeCommitmentBarStyle}>
                        </span>
                    </div>
                    <div class="timecommitment-bar-number">
                        <p>5 hours</p>
                    </div>
                </div>
            </div>
        </div>
    </div>        
        );
}