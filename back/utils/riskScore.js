export function calculateRiskScore({ approvals }) {
    if (!approvals || approvals.length === 0) return 10
  
    let score = 10
  
    approvals.forEach((approval) => {
      if (approval.contract_name?.toLowerCase().includes('unknown')) {
        score -= 3
      }
      if (approval.spender === '0x000...dead') {
        score -= 5
      }
    })
  
    return Math.max(score, 0)
  }
  