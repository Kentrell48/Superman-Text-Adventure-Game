const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Superman\'s powers are not as strong as they usually are, he needs help, he has two people in mind.',
    options: [
      {
        text: 'Batman',
        nextText: 2
      },
      {
        text: 'Lois Lane',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Superman goes to the BatCave. Batman tells Superman he probably has kryptonite poisoning and tells him he should go to the Fortress of Solitude.',
    options: [
      {
        text: 'Go to Fortress of Solitude',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'Superman goes to the Kent family farm. He talks to Lois and he asks what should he do about him getting weaker. Lois says the Sun solves everything for him so he should go to the sun and see if he can burn out whatver is making him weaker.',
    options: [
      {
        text: 'Fly to the sun',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'At the fortress, you were scanned and the kryptonite was destroyed.',
    options: [
      {
        text: 'Return to Batcave',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'Superman was able to get the kryptonite destroyed from flying up to the sun.',
    options: [
      {
        text: 'Return to Kent Family Farm',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'You return to the Batcave to thank Batman.',
    options: [
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You return to the Kent Family Farm and thanked Louis Lane.',
    options: [
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  }
]

startGame()