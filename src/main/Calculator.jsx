import './Calculator.css'
import React, { Component } from 'react'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0], // to store the values between operations
  current: 0 // index of the value in the array
}

class Calculator extends Component {

  state = { ...initialState }

  constructor(props) {
    super(props)

    /* To resolve the problem with the 'this'  */
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    console.log(operation)
  }

  addDigit(n) {
    /* Avoid having two dots on the display */
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }

    /* 
      clearDisplay: avoid the left zero with two situations
        - When the only number displayed is zero
        - When the state clearDisplay is true
    */
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n // string concatenation 

    this.setState({ displayValue, clearDisplay: false, })

    if (n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue

      /* when the key have the same name as the value there is no need to do values: values */
      this.setState({ values })
      console.log(values)
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    )
  }
}

export default Calculator
