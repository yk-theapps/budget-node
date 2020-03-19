import { BudgetRepository } from './budget.repository';
import { EXPENSE_CATEGORIES } from '../shared/expense-categories/in-memory-expense-categories.repository';
import { Id } from '../../models/types';
import { Period } from '../../models/period';
import { Budget } from '../../models/budget';
import { BudgetSummary } from '../../models/budgetSummary';

export class InMemoryBudgetRepository implements BudgetRepository {

  getBugdets(accountId: Id, period: Period): Promise<Budget[]> {
    const budgets = BUDGETS.filter(budget => period.equals(budget.period) && budget.accountId === accountId);
    return new Promise((resolve, reject) => {
      budgets ? resolve(budgets) : reject();
    });
  }

  getBudgetSummary(accountId: Id, period: Period): Promise<BudgetSummary> {
    const summary = BUDGET_SUMMARIES.find(summary => period.equals(summary.period) && summary.accountId === accountId);
    return new Promise((resolve, reject) => {
      summary ? resolve(summary) : reject();
    });
  }

}

const period = new Period(3, 2020); // TODO remove this fixture

const BUDGETS: Budget[] = [
  Budget.build({
    id: '1',
    accountId: '1',
    period: period,
    category: EXPENSE_CATEGORIES[0],
    currentExpenses: 100,
    maxExpenses: 500
  }),
  Budget.build({
    id: '2',
    accountId: '1',
    period: period,
    category: EXPENSE_CATEGORIES[1],
    currentExpenses: 100,
    maxExpenses: 300
  }),
  Budget.build({
    id: '3',
    accountId: '2',
    period: period,
    category: EXPENSE_CATEGORIES[2],
    currentExpenses: 200,
    maxExpenses: 300
  })
];

const summary1 = new BudgetSummary('1', period);
summary1.totalExpenses = 200;
summary1.totalBudget = 800;

const summary2 = new BudgetSummary('2', period);
summary2.totalExpenses = 200;
summary2.totalBudget = 300;

const BUDGET_SUMMARIES: BudgetSummary[] = [summary1, summary2];