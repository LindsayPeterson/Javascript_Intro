function*  errorHandling() {
    try  {
        yield 1;
        throw ('another error')
        yield 2;
        yield 3;
    } catch (error) {
        console.error(error)
    }
}

const errorIt = errorHandling();
console.log(errorIt.next())
errorIt.throw('error message')
console.log(errorIt.next())