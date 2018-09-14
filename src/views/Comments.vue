<template>
  <div>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <span class="comment-text">{{ comment.text }}</span>
      <input type="button" class="btn" @click="deleteComment(comment.id)" value="Удалить">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      comment: '',
    };
  },
  created() {
    if (this.comments.length) return;

    // create 10 test comments
    const testComments = [
      'Тестовый комментарий 1',
      'Это шедевр',
      'Это прекрасно',
      'Лучшее, что я видел',
      'Два чая этому автору',
      'Комментарий (удоляется)',
      '☻☻☺☻☻☻',
      'Удали этот комментарий',
      'Очень хороший сайт',
      'Мне нравится',
    ];
    testComments.map(comment => this.newComment(comment));
  },
  computed: {
    ...mapState({
      comments: state => state.comments.comments,
    }),
  },
  methods: {
    ...mapActions(['newComment', 'deleteComment']),
  },
};
</script>

<style scoped>
input {
  background-color: white;
  border: 1px solid lightgray;
}
input[type='button'] {
  cursor: pointer;
}
input[type='button']:hover {
  background-color: lightgray;
}
input:focus {
  outline: none;
}
.comment {
  padding: 5px;
  margin-bottom: 10px;
}
.comment-text {
  margin-right: 10px;
}
.btn {
  padding: 5px 10px;
  border-radius: 2px;
  margin-left: 10px;
}
</style>
