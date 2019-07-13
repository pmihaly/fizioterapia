import { Training } from '.'

let training

beforeEach(async () => {
  training = await Training.create({ name: 'test', thumbnail: 'test', patient: 'test', exercises: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = training.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(training.id)
    expect(view.name).toBe(training.name)
    expect(view.thumbnail).toBe(training.thumbnail)
    expect(view.patient).toBe(training.patient)
    expect(view.exercises).toBe(training.exercises)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = training.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(training.id)
    expect(view.name).toBe(training.name)
    expect(view.thumbnail).toBe(training.thumbnail)
    expect(view.patient).toBe(training.patient)
    expect(view.exercises).toBe(training.exercises)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
