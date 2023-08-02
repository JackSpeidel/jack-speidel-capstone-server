// const posts = require('./seed-data/posts');

const posts = [
    // {
    //     title: "His mother had always taught him",
    //     content:
    //       "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    //     likes: 2,
    //     user_id: 1,
    //   },
    //   {
    //     title: "He was an expert but not in a discipline",
    //     content:
    //       "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
    //     likes: 2,
    //     user_id: 2,
    //   },
    //   {
    //     title: "Dave watched as the forest burned up on the hill.",
    //     content:
    //       "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
    //     likes: 5,
    //     user_id: 3,
    //   }
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert(posts);
};

module.exports;