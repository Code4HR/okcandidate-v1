import React, { PropTypes, Component } from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'

import CandidateMatchProfileBadge from './../molecules/CandidateMatchProfileBadge.jsx'

import CandidateMatchCategory from './../organisms/CandidateMatchCategory.jsx'
import Card from './../atoms/Card.jsx'

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

  render() {
    return (
      <Card className="candidate-card" style={{marginBottom: '1em'}}>
        <div style={{display: 'flex'}}>
          <CandidateMatchProfileBadge
            candidateName={this.props.candidateName}
            compositeMatchScore={this.props.compositeMatchScore}
            style={{flex: 1}} />
          <Button onClick={event => this.toggleCategories()}>
            <Glyphicon glyph={this.glyph} />
          </Button>
        </div>

        <Panel collapsible expanded={this.state.showCategory}
          style={{border: 'none', boxShadow: 'none'}}>
          {
            this.state.showCategory ?
            this.props.categoryMatchScores.map((category, index) => {
              return (
                <CandidateMatchCategory
                  key={index}
                  categoryName={category.categoryName}
                  categoryMatch={category.categoryMatch}
                  questions={category.questions} />
              )
            })
            :
            null
          }
        </Panel>

      </Card>
    )
  }

}

CandidateMatchCandidate.propTypes = {
  candidateName: PropTypes.string,
  compositeMatchScore: PropTypes.string,
  categoryMatchScores: PropTypes.array
}

export default CandidateMatchCandidate
