import { Exercise } from '.';

let exercise;

beforeEach(async () => {
  exercise = await Exercise.create({ name: 'test', thumbnail: 'test', youtubeLink: 'test' });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = exercise.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(exercise.id);
    expect(view.name).toBe(exercise.name);
    expect(view.thumbnail).toBe(exercise.thumbnail);
    expect(view.youtubeLink).toBe(exercise.youtubeLink);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = exercise.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(exercise.id);
    expect(view.name).toBe(exercise.name);
    expect(view.thumbnail).toBe(exercise.thumbnail);
    expect(view.youtubeLink).toBe(exercise.youtubeLink);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
