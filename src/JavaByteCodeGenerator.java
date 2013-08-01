import org.objectweb.asm.Label;

// GreenTea Generator should be written in each language.

class LabelStack {
	GtArray	LabelNames;
	GtArray	Labels;

	LabelStack() {
		this.LabelNames = new GtArray();
		this.Labels = new GtArray();
	}

	void AddLabel(String Name, Label Label) {
		this.LabelNames.add(Name);
		this.Labels.add(Label);
	}

	Label FindLabel(String Name) {
		for(int i = this.LabelNames.size() - 1; i >= 0; i--) {
			String LName = (String) this.LabelNames.get(i);
			if(LName.equals(Name)) {
				return (Label) this.Labels.get(i);
			}
		}
		return null;
	}

	void RemoveLabel(String Name) {
		for(int i = this.LabelNames.size() - 1; i >= 0; i--) {
			String LName = (String) this.LabelNames.get(i);
			if(LName.equals(Name)) {
				this.LabelNames.remove(i);
				this.Labels.remove(i);
			}
		}
	}
}



public class JavaByteCodeGenerator extends GreenTeaGenerator {
	
	
	
	@Override 
	public void VisitDefineNode(DefineNode Node) { 
	}

	@Override 
	public void VisitConstNode(ConstNode Node) { 
	}

	@Override 
	public void VisitNewNode(NewNode Node) { 
	}

	@Override 
	public void VisitNullNode(NullNode Node) { 
	}

	@Override 
	public void VisitLocalNode(LocalNode Node) { 
	}

	@Override 
	public void VisitGetterNode(GetterNode Node) { 
	}

	@Override 
	public void VisitApplyNode(ApplyNode Node) { 
	}

	@Override 
	public void VisitBinaryNode(BinaryNode Node) { 
	}

	@Override 
	public void VisitAndNode(AndNode Node) { 
	}

	@Override 
	public void VisitOrNode(OrNode Node) { 
	}

	@Override 
	public void VisitAssignNode(AssignNode Node) { 
	}

	@Override 
	public void VisitLetNode(LetNode Node) { 
	}

	@Override 
	public void VisitIfNode(IfNode Node) { 
	}

	@Override 
	public void VisitSwitchNode(SwitchNode Node) { 
	}

	@Override 
	public void VisitLoopNode(LoopNode Node) { 
	}

	@Override 
	public void VisitReturnNode(ReturnNode Node) { 
	}

	@Override 
	public void VisitLabelNode(LabelNode Node) { 
	}

	@Override 
	public void VisitJumpNode(JumpNode Node) { 
	}

	@Override 
	public void VisitBreakNode(BreakNode Node) { 
	}
	
	@Override 
	public void VisitContinueNode(ContinueNode Node) { 
	}

	@Override 
	public void VisitTryNode(TryNode Node) { 
	}

	@Override 
	public void VisitThrowNode(ThrowNode Node) { 
	}

	@Override 
	public void VisitFunctionNode(FunctionNode Node) { 
	}

	@Override 
	public void VisitErrorNode(ErrorNode Node) { 
	}

}



