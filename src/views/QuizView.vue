<template>
  <main class="content flex flex-col items-center h-screen p-8 justify-center">
    <h1 class="mb-8 text-3xl font-semibold xxs:text-md">The Quiz</h1>

    <section
      class="quiz bg-slate-700 p-4 w-full max-w-screen-md mx-auto rounded-md"
      v-if="!quizCompleted && !quizOver"
    >
      <div class="quiz-info flex justify-between mb-4">
        <span class="question text-lg ml-1 text-slate-200">{{
          getCurrentQuestion.question
        }}</span>
        <span class="score text-white text-lg"
          >Score {{ score }}/{{ questions.length }}</span
        >
      </div>

      <div class="options mb-4">
        <label
          v-for="(option, index) in getCurrentQuestion.options"
          :for="'option' + index"
          :key="index"
          :class="`option ${
            getCurrentQuestion.selected == index
              ? index == getCurrentQuestion.answer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected != null &&
            index != getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
          class="hover:bg-slate-500"
        >
          <input
            type="radio"
            :id="'option' + index"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="setAnswer"
          />
          <span>{{ option }}</span>
        </label>
      </div>

      <button
        class="xxs:px-2 xxs:text-[0.9rem] cursor-pointer bg-lime-600 hover:bg-lime-700 text-white rounded-md px-6 py-[0.5rem] mt-4"
        @click="nextQuestion"
        :disabled="!getCurrentQuestion.selected"
      >
        {{
          getCurrentQuestion.index == questions.length - 1
            ? "Finish"
            : getCurrentQuestion.selected == null
            ? "Select an option"
            : "Next question"
        }}
      </button>
      <p class="text-white text-lg text-right xxs:text-[0.98rem]">
        Remaining time: {{ formattedTime }}
      </p>
    </section>

    <section v-else>
      <h2 class="text-[2rem] text-center mb-8 xxs:text-[1.4rem]">
        You have finished the quiz!
      </h2>
      <p class="text-xl text-center text-white xxs:text-[1.1rem]">
        Your score: {{ score }}/{{ questions.length }}
      </p>
      <div class="stars flex justify-center items-center mt-4">
        <i
          v-for="star in numberOfStars"
          :key="star"
          class="fas fa-star text-yellow-400 text-2xl my-2 mx-1"
        ></i>
      </div>
      <p v-if="quizOver" class="text-lg text-center text-slate-400">
        Time's up! Quiz over.
      </p>
      <p v-else class="xxs:text-[1rem] text-xl text-center text-white">
        Time spent: {{ formatTime(quizEndTime - quizStartTime) }}
      </p>
      <router-link to="/" class="flex justify-center items-center mt-4">
        <button
          class="xxs:text-[1rem] flex justify-center items-center cursor-pointer bg-lime-600 text-lg hover:bg-lime-700 text-white rounded-md px-8 py-[0.5rem]"
        >
          Go Home Page
        </button>
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const questions = ref([
  {
    question: "What is Vue.js?",
    answer: 0,
    options: ["Front-end framework", "Library", "Tool"],
    selected: null,
  },
  {
    question: "What is HTML?",
    answer: 2,
    options: ["Programming language", "NPM package", "Markup Language"],
    selected: null,
  },
  {
    question: "What is Bootstrap?",
    answer: 1,
    options: ["Programming language", "Css framework", "Js framework"],
    selected: null,
  },
]);
const quizCompleted = ref(false);
const quizOver = ref(false);
const currentQuestion = ref(0);
const timer = ref(60);
let formattedTime = ref("01:00");
let quizStartTime = 0;
let quizEndTime = 0; 

onMounted(() => {
  startTimer();
  quizStartTime = Date.now();
});

const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected == q.answer) {
      value++;
    }
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const setAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return;
  }
  quizEndTime = Date.now(); 

  quizCompleted.value = true;
};
const numberOfStars = computed(() => {
  const scoreValue = score.value;
  if (scoreValue === 3) {
    return 3; 
  } else if (scoreValue >= 2) {
    return 2; 
  } else if (scoreValue >= 1) {
    return 1; 
  } else {
    return 0; 
  }
});
function startTimer() {
  const interval = setInterval(() => {
    if (timer.value === 0) {
      clearInterval(interval);
      quizOver.value = true;
    } else {
      timer.value--;
      formattedTime.value = `${Math.floor(timer.value / 60)
        .toString()
        .padStart(2, "0")}:${(timer.value % 60).toString().padStart(2, "0")}`;
    }
  }, 1000); 
}
const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #271c36;
  color: #fff;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.correct {
  background-color: #2cd882;
}

.wrong {
  background-color: #e93a40;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button:disabled {
  opacity: 0.5;
}
</style>
