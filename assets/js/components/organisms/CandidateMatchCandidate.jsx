import React, { PropTypes, Component } from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'

import CandidateMatchProfileBadge from './../molecules/CandidateMatchProfileBadge.jsx'

import CandidateMatchCategory from './../organisms/CandidateMatchCategory.jsx'
import Card from './../atoms/Card.jsx'

const style = {
  panel: {
    border: 'none',
    boxShadow: 'none',
    marginBottom: 0
  }
}

class CandidateMatchCandidate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCategory: false
    }
  }

  get glyph() {
    return `chevron-${this.state.showCategory ? 'up' : 'down'}`
  }

  toggleCategories() {
    this.setState({
      showCategory: !this.state.showCategory
    })
  }

  sortCategories(categories) {
    return _.sortBy(categories, category => {
      return category.categoryMatch
    }).reverse()
  }

  render() {
    return (
      <Card className="candidate-card" style={{marginBottom: '1em', padding: '1rem'}}>
        <div style={{display: 'flex'}}>
          <CandidateMatchProfileBadge
            candidateName={this.props.candidateName}
            candidateWebsite={this.props.candidateWebsite}
            compositeMatchScore={this.props.compositeMatchScore}
            style={{flex: 1}} />
          <Button onClick={() => this.toggleCategories()}>
            <Glyphicon glyph={this.glyph} />
          </Button>
        </div>

        <Panel collapsible expanded={this.state.showCategory}
          style={style.panel}>
          {
            this.sortCategories(this.props.categoryMatchScores).map((category, index) => {
              return (
                <CandidateMatchCategory
                  key={index}
                  categoryName={category.categoryName}
                  categoryMatch={category.categoryMatch}
                  questions={category.questions} />
              )
            })
          }
        </Panel>

      </Card>
    )
  }

}

CandidateMatchCandidate.propTypes = {
  candidateName: PropTypes.string,
  candidateWebsite: PropTypes.string,
  compositeMatchScore: PropTypes.number,
  categoryMatchScores: PropTypes.array
}

export default CandidateMatchCandidate
