package com.example.board.domain.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PagingUtil {
    Integer currentPageNum;
	Integer objectCountTotal;
	Integer objectCountPerPage;
	Integer objectStartNum;
	Integer objectEndNum;
	Integer pageNumCountTotal;
	Integer pageNumCountPerPage;
	Integer pageNumStart;
	Integer pageNumEnd;
	Boolean isPrev;
	Boolean isNext;


    public PagingUtil() {
		this.currentPageNum = 1;
		this.objectCountPerPage = 10;
		this.pageNumCountPerPage = 5;

		setObjectStartAndEnd();
	}

    public PagingUtil(int currentPageNum) {
		this.currentPageNum = (0 < currentPageNum) ? currentPageNum : 1 ;
		this.objectCountPerPage = 10;
		this.pageNumCountPerPage = 5;

		setObjectStartAndEnd();
	}

    public PagingUtil(int currentPageNum, int objectCountPerPage, int pageNumCountPerPage) {
		this.currentPageNum = (0 < currentPageNum) ? currentPageNum : 1 ;
		this.objectCountPerPage = (0 < objectCountPerPage) ? objectCountPerPage : 10 ;
		this.pageNumCountPerPage = (0 < pageNumCountPerPage) ? pageNumCountPerPage : 5 ;

		setObjectStartAndEnd();
	}

    public void setObjectStartAndEnd() {
		this.objectEndNum = currentPageNum * objectCountPerPage;
		this.objectStartNum = (objectEndNum - 1) - (objectCountPerPage - 1);

	}

    public boolean setCalcForPaging(Integer objectCountTotal) {
		if (objectCountTotal == null) {
			return false;
		}
		
		try {
			
			this.objectCountTotal = objectCountTotal;
			this.pageNumCountTotal = (int) Math.ceil((double)objectCountTotal / objectCountPerPage);
			
			int tmpPageNumStart = ((int) Math.ceil(currentPageNum / pageNumCountPerPage) 
					* pageNumCountPerPage);
			int tmpPageNumEnd = 0;
					
			if (tmpPageNumStart == 0) {
				this.pageNumStart = 1;
				tmpPageNumEnd = tmpPageNumStart + pageNumCountPerPage;		
			} else if (tmpPageNumStart == currentPageNum) {
				this.pageNumStart = tmpPageNumStart - (pageNumCountPerPage - 1);
				tmpPageNumEnd = currentPageNum;
			} else {
				this.pageNumStart = tmpPageNumStart + 1;
				tmpPageNumEnd = pageNumStart + pageNumCountPerPage;
			}
			
			
			this.pageNumEnd = (pageNumCountTotal < tmpPageNumEnd) ? pageNumCountTotal : tmpPageNumEnd;
			
			this.isPrev = (currentPageNum > pageNumCountPerPage) ? true : false;
			this.isNext = (pageNumEnd < pageNumCountTotal || (pageNumStart < pageNumEnd && currentPageNum < pageNumCountTotal)  ) ? true : false;
			
			this.objectEndNum = (objectCountTotal < objectEndNum) ? objectCountTotal : objectEndNum;
		    return true;
		    
		} catch (Exception e) {e.printStackTrace(); return false;}
		
	}
    
    public boolean setCalcForPaging() {
		return setCalcForPaging(this.objectCountTotal);
	}

    public void setObjectCountTotal(Integer objectCountTotal) {
		this.objectCountTotal = objectCountTotal;
		
	}
	
	public void setCurrentPageNum(Integer currentPageNum) {
		this.currentPageNum = (0 < currentPageNum) ? currentPageNum : 1 ;
		setObjectStartAndEnd();
	}

	public Integer getCurrentPageNum() {
		return currentPageNum;
	}

	public Integer getObjectCountTotal() {
		return objectCountTotal;
	}

	public Integer getObjectCountPerPage() {
		return objectCountPerPage;
	}

	public Integer getObjectStartNum() {
		return objectStartNum;
	}

	public Integer getObjectEndNum() {
		return objectEndNum;
	}

	public Integer getPageNumCountTotal() {
		return pageNumCountTotal;
	}

	public Integer getPageNumCountPerPage() {
		return pageNumCountPerPage;
	}

	public Integer getPageNumStart() {
		return pageNumStart;
	}

	public Integer getPageNumEnd() {
		return pageNumEnd;
	}

	public boolean isPrev() {
		return isPrev;
	}

	public boolean isNext() {
		return isNext;
	}

	@Override
	public String toString() {
		return "PagingUtil [currentPageNum=" + currentPageNum + ", objectCountTotal=" + objectCountTotal
				+ ", objectCountPerPage=" + objectCountPerPage + ", objectStartNum=" + objectStartNum
				+ ", objectEndNum=" + objectEndNum + ", pageNumCountTotal=" + pageNumCountTotal
				+ ", pageNumCountPerPage=" + pageNumCountPerPage + ", pageNumStart=" + pageNumStart + ", pageNumEnd="
				+ pageNumEnd + ", isPrev=" + isPrev + ", isNext=" + isNext + "]";
	}
}
