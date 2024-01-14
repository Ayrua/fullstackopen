const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const formatParts = parts.map((part) => <Part part={part} key={part.id} />)
  return formatParts
}

const Course = ({ courses }) => {
  const formatCourses = courses.map((course) => {
    return (
      <li key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((sum, i) => sum + i.exercises, 0)} />
      </li>
    )
  })
  return formatCourses
}

export default Course