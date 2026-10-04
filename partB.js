//problem 1
function deepEqual(objA, objB) {
  //to check if they are the same
  if (objA === objB) {return true}
  //to check if objA is null or not an object
  if (objA === null) {return false}
  if (typeof objA !== "object") {return false}
  //to check if objB is null or not an object
  if (objB === null) {return false}
  if (typeof objB !== "object") {return false}
  // to list the set of keys
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  //to check if the number of keys are equal
  if (keysA.length !== keysB.length) {return false}
  //to check each key and value are the same
  for (let key of keysA) {
    if (!(key in objB)) {return false}
    // Check if the inner values match recursively
    if (!deepEqual(objA[key], objB[key])){return false}
  }
  return true

}
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })) // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })) // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))                     // false


//problem 2
function diffObjects(oldObj, newObj) {
  const result = {
    added: {},
    removed: {},
    changed: {}
  }

  //to check the items that appear in oldobj and notin newobj
  for (let key of Object.keys(oldObj)){
    if (!(key in newObj)) {
      result.removed[key] = oldObj[key]
    }
  }

  // to check newobj for itmes that do not appear in oldobj
  for (let key of Object.keys(newObj)) {
    if (!(key in oldObj)) {
      result.added[key] = newObj[key]
    } else if (newObj[key] !== oldObj[key]) {
      //to check what values were altered
      result.changed[key] = { from: oldObj[key], to: newObj[key] }
    }
  }

  return result
}

console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))


//problem 3
function deepFreeze(obj) {
  Object.freeze(obj)
  //to check the the value is an object
  for (let val of Object.values(obj)){
    if (val !== null && typeof val === "object") {deepFreeze(val)}
  }
  return obj
}
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com' // should be ignored
config.debug = true                        // should be ignored
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))       // true

//problem 4
function createCounter() {
  let count = 0

  return {
    increment() {
      count++
    },
    decrement() {
      count--
    },
    get value() {
      return count
    }
  }
}
  
const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value)  // 1
console.log(counter.count)  // undefined — not directly accessible

//problem 5
function validateSchema(obj, schema) {
  const errors = []
  for (let key of Object.keys(schema)) {
    // to check if they failed to provide this property at all?
    if (!(key in obj)) {
      errors.push(`${key}: missing property`)
    }
    else if (typeof obj[key] !== schema[key]) {
      errors.push(`${key}: expected ${schema[key]}, got ${typeof obj[key]}`)
    }
  }
  return errors
}

const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))