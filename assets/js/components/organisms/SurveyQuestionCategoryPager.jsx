import React, { PropTypes, Component } from 'react'

import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap'

import colors from './../style/colors'

const styles = {
  container: {
    background: colors.darkBlue,
    padding: '.5em',
    color: colors.white
  },
  input: {
    marginBottom: 0
  }
}

class SurveyQuestionCategoryPager extends Component {

  /*
   * @name SurveyQuestionCategoryPager#getCategoryIndex
   * @param {array} categories
   * Array of category objects
   * @param {number} categoryId
   * Number corresponding to a category ID
   * @description
   * Returns the index of a given category within the category array.
   */
  getCategoryIndex(categories, categoryId) {
    return categories.findIndex(category => {
      return category.id === categoryId
    })
  }

  /*
   * @name SurveyQuestionCategoryPager#selectCategory
   * @param {event} event
   * DOM Event coming from a select element.
   * @description
   * Parses the category ID of a category selection, finds the object on
   * the categories object that matches, and passes the index of the first question
   * of that category to #setIndex
   */
  selectCategory(event) {
    const categoryId = parseInt(event.target.value, 10)
    const category = this.getCategory(this.props.categories, categoryId)
    this.props.setIndex(category.firstQuestionIndex)
  }

  /*
   * @name SurveyQuestionCategoryPager#nextCategory
   * @description
   * Finds the index of the active category, increments it by one, and then passes
   * the index of the first question of that category to #setIndex
   */
  nextCategory() {
    const categoryIndex = this.getCategoryIndex(
      this.props.categories,
      this.props.question.categoryId
    )
    const nextCategoryQuestionIndex = this.props.categories[categoryIndex + 1].firstQuestionIndex
    this.props.setIndex(nextCategoryQuestionIndex)
  }

  /*
   * @name SurveyQuestionCategoryPager#prevCategory
   * @description
   * Finds the index of the active category, decrements it by one, and then passes
   * the index of the first question of that category to #setIndex
   */
  prevCategory() {
    const categoryIndex = this.getCategoryIndex(
      this.props.categories,
      this.props.question.categoryId
    )
    const prevCategoryQuestionIndex = this.props.categories[categoryIndex - 1].firstQuestionIndex
    this.props.setIndex(prevCategoryQuestionIndex)
  }

  render() {

    const categoryIndex = this.getCategoryIndex(
      this.props.categories,
      this.props.question.categoryId
    )
    const currentCategory = this.props.categories[categoryIndex]

    const disablePrevButton = categoryIndex === 0
    const disableNextButton = categoryIndex === this.props.categories.length - 1

    return (
      <section style={styles.container}>
        <FormGroup controlId="categorySelect" style={styles.input}>
          <ControlLabel>Category</ControlLabel>
          <InputGroup>
            <InputGroup.Button>
              <Button
                disabled={disablePrevButton}
                onClick={this.prevCategory.bind(this)}>
                Back
              </Button>
            </InputGroup.Button>
            <FormControl
              onChange={this.selectCategory.bind(this)}
              componentClass="select"
              placeholder="select"
              value={currentCategory.id} >
              {
                this.props.categories.map((category, index) => {
                  return (
                    <option
                      key={index}
                      value={category.id}>
                      {category.categoryName}
                    </option>
                  )
                })
              }
            </FormControl>
            <InputGroup.Button>
              <Button
                bsStyle="primary"
                disabled={disableNextButton}
                onClick={this.nextCategory.bind(this)}>
                Next
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </section>
    )
  }

}

SurveyQuestionCategoryPager.propTypes = {
  categories: PropTypes.array,
  question: PropTypes.object,
  setIndex: PropTypes.func,
  prevCategory: PropTypes.func,
  nextCategory: PropTypes.func,
  dispatch: PropTypes.func
}

export default SurveyQuestionCategoryPager
